use anchor_lang::prelude::*;
use anchor_spl::{
    token::{ Mint, Token, TokenAccount},
    associated_token::AssociatedToken,
};
use crate::state::*;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct MintTicketNFT<'info> {
    #[account(mut)]
    pub event: Account<'info, Event>,
    #[account(mut, has_one = event)]
    pub collection: Account<'info, NFTCollection>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(
        init,
        payer = buyer,
        mint::decimals = 0,
        mint::authority = collection,
    )]
    pub mint: Account<'info, Mint>,
    #[account(
        init,
        payer = buyer,
        associated_token::mint = mint,
        associated_token::authority = buyer
    )]
    pub token_account: Account<'info, TokenAccount>,
    #[account(
        init,
        payer = buyer,
        space = 8 + 32 + 32 + 32 + 32 + 2 + 1
    )]
    pub ticket_nft: Account<'info, TicketNFT>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn mint_ticket_nft(ctx: Context<MintTicketNFT>, seat_number: u16) -> Result<()> {
    let event = &ctx.accounts.event;
    let collection = &mut ctx.accounts.collection;
    let ticket_nft = &mut ctx.accounts.ticket_nft;

    require!(event.status == EventStatus::SALE, ErrorCode::EventNotOnSale);
    require!(collection.minted_count < collection.total_supply, ErrorCode::SoldOut);

    // Mint logic would go here
    // For simplicity, we'll just update the accounts without actual minting

    ticket_nft.event = event.key();
    ticket_nft.collection = collection.key();
    ticket_nft.mint = ctx.accounts.mint.key();
    ticket_nft.owner = ctx.accounts.buyer.key();
    ticket_nft.seat_number = seat_number;
    ticket_nft.status = NFTStatus::MINTED;

    collection.minted_count += 1;

    Ok(())
}