use anchor_lang::prelude::*;
use strum_macros::EnumString;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, EnumString, PartialEq)]
pub enum Category {
    PHYSICAL, 
    VIRTUAL
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, EnumString, PartialEq)]
pub enum CollectionStatus {
    CREATED,
    ACTIVE,
    PAUSED,
    COMPLETED,
    CANCELLED
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, EnumString, PartialEq)]
pub enum NFTStatus {
    MINTED,
    LISTED,
    TRANSFERRED,
    USED,
    BURNED
}

#[account]
pub struct Event {
    pub authority: Pubkey,
    pub title: String,
    pub description: String,
    pub location: String,
    pub category: Category,
    pub deadline: i64,
    pub ticket_count: u32,
    pub collection: Pubkey,
}

#[account]
pub struct NFTCollection {
    pub event: Pubkey,
    pub collection_mint: Pubkey,
    pub authority: Pubkey,
    pub total_supply: u32,
    pub minted_count: u32,
    pub status: CollectionStatus,
}

#[account]
pub struct TicketNFT {
    pub event: Pubkey,
    pub collection: Pubkey,
    pub mint: Pubkey,
    pub owner: Pubkey,
    pub seat_number: u16,
    pub status: NFTStatus,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct EventData {
    pub title: String,
    pub description: String,
    pub location: String,
    pub category: Category,
    pub deadline: i64,
    pub ticket_count: u32,
}