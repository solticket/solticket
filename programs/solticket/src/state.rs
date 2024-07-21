use anchor_lang::prelude::*;
use strum_macros::EnumString;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, EnumString)]
pub enum EventStatus {
    CREATE,
    SALE,
    RUN,
    CLOSED,
    CANCELLED,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, EnumString)]
pub enum Category {
    PHYSICAL,
    VIRTUAL,
}

#[account]
pub struct Event {
    pub authority: Pubkey,
    pub title: String,
    pub description: String,
    pub location: String,
    pub category: Category,
    pub start_date: u64,
    pub total_seats: u32,
    pub status: EventStatus,
    pub image_url: String,
}
