use anchor_lang::prelude::*;
use crate::state::{EventStatus, Category,CollectionStatus, NFTStatus};
// Définition de la structure du NFT de billet de concert
#[account]
pub struct ConcertTicketNFT {
    pub authority: Pubkey,       // Autorité du NFT (le propriétaire en général)
    pub ticket_mint: Pubkey,     // Adresse du mint du NFT
    pub concert_name: String,    // Nom du concert
    pub seat_number: u16,        // Numéro de siège pour l'évènement
    pub is_used: bool,           // Indique si le billet a été utilisé
    pub metadata_uri: String,    // URI des métadonnées du NFT
    pub collection: Pubkey,      // Adresse de la collection à laquelle appartient ce NFT
    pub status: NFTStatus,
}

// Définition de la structure de la collection de tickets
#[account]
pub struct TicketCollection {
    pub authority: Pubkey,       // Autorité de la collection (organisateur de l'événement)
    pub event: Pubkey,           // Adresse de l'événement associé
    pub title: String,           // Titre de la collection
    pub metadata_uri: String,    // URI des métadonnées de la collection
    pub total_tickets: u32,      // Nombre total de tickets dans la collection
    pub minted_tickets: u32,     // Nombre de tickets déjà mintés
    pub status: CollectionStatus, 
}

// Structure pour les statistiques d'un événement
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct EventStats {
    pub total_tickets: u32,
    pub sold_tickets: u32,
    pub used_tickets: u32,
    pub total_revenue: u64,
}

#[account]
pub struct Event {
    pub authority: Pubkey,
    pub title: String,
    pub description: String,
    pub location: String,
    pub category: Category,
    pub deadline: u64,
    pub ticket_count: u32,
    pub status: EventStatus,
}