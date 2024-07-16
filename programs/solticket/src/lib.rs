use anchor_lang::prelude::*;
use std::str::FromStr;
use crate::errors::ErrorCode;
declare_id!("3ACETbVphkSQQ5WW82ArvnyFLDSrooVX6C77SL3UcXLB");

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

use instructions::*;
use constants::*;

#[program]
pub mod solticket {
    use super::*;

    pub fn create_event(
        ctx: Context<CreateEvent>,
        title: String,
        description: String,
        location: String,
        category: String,
        deadline: u64,
        ticket_count: u32
    ) -> Result<()> {
        let category_enum = Category::from_str(&category).map_err(|_| ErrorCode::InvalidCategory)?;
        instructions::create_event(ctx, title, description, location, category_enum, deadline, ticket_count)
    }

    pub fn update_status_event(
        ctx: Context<UpdateEvent>,
        status: EventStatus
    ) -> Result<()> {
        instructions::update_status_event(ctx, status)
    }

    pub fn update_deadline_event(
        ctx: Context<UpdateEvent>,
        deadline: u64,
    ) -> Result<()> {
        instructions::update_deadline_event(ctx, deadline)
    }
}