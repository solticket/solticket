use crate::Category;
use anchor_lang::prelude::*;

#[account]
pub struct Event {
    pub authority: Pubkey,
    pub title: String,
    pub description: String,
    pub location: String,
    pub category: Category,
    pub deadline: u64,
    pub ticket_count: u32,
    pub status: String,
}
