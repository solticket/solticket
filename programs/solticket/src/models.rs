use anchor_lang::prelude::*;
use anchor_spl::token::{TokenAccount, Token};

// Définition de la structure du NFT de billet de concert
#[account]
pub struct ConcertTicketNFT {
    pub authority: Pubkey,       // Autorité du NFT (le propriétaire en général)
    pub ticket_mint: Pubkey,     // Adresse du mint du NFT
    pub concert_name: String,    // Nom du concert
    pub seat_number: u16,        // Numéro de siège pour l'évènement
    pub is_used: bool,           // Indique si le billet a été utilisé
    pub metadata_uri: String,    // URI des métadonnées du NFT
    pub collection: Pubkey,  
}

#[account]
pub struct TicketCollection {
    pub authority: Pubkey,
    pub event: Pubkey,
    pub title: String,
    pub metadata_uri: String,
}

// Structure définissant les comptes nécessaires pour initialiser un NFT de billet
#[derive(Accounts)]
pub struct InitializeConcertTicket<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,    // Le signataire qui initialise le NFT

    // Compte PDA pour stocker les données du NFT
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 32 + 64 + 2 + 1 + 128,  // Espace alloué pour les données
        seeds = [b"concert-ticket", authority.key().as_ref(), ticket_mint.key().as_ref()],
        bump
    )]
    pub ticket_account: Account<'info, ConcertTicketNFT>,

    pub ticket_mint: Account<'info, Mint>,  // Compte du mint du NFT

    // Compte de token associé pour stocker le NFT
    #[account(
        init,
        payer = authority,
        associated_token::mint = ticket_mint,
        associated_token::authority = authority
    )]
    pub token_account: Account<'info, TokenAccount>,

    // Programmes requis
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

impl<'info> InitializeConcertTicket<'info> {
    // Fonction pour initialiser les données du NFT
    pub fn initialize(&mut self, concert_name: String, seat_number: u16, metadata_uri: String) -> Result<()> {
        let ticket = &mut self.ticket_account;
        ticket.authority = self.authority.key();
        ticket.ticket_mint = self.ticket_mint.key();
        ticket.concert_name = concert_name;
        ticket.seat_number = seat_number;
        ticket.is_used = false;  // Initialement, le billet n'est pas utilisé
        ticket.metadata_uri = metadata_uri;
        Ok(())
    }
}