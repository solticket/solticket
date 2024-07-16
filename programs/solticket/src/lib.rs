use anchor_lang::prelude::*;
use std::str::FromStr;
declare_id!("3ACETbVphkSQQ5WW82ArvnyFLDSrooVX6C77SL3UcXLB");

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

use constants::*;
use instructions::*;
#[program]
pub mod solticket {

    use super::*;

    pub fn create_event(
        ctx: Context<CreateEvent>,
        title: String,
        description: String,
        location: String,
        _category: String,
        deadline: u64,
        ticket_count: u32,
    ) -> Result<()> {
        let category_enum = Category::from_str("VIRTUAL").unwrap();
        instructions::create_event(
            ctx,
            title,
            description,
            location,
            category_enum,
            deadline,
            ticket_count,
        )
    }

    pub fn update_status_event(ctx: Context<UpdateEvent>, status: String) -> Result<()> {
        instructions::update_status_event(ctx, status)
    }

    pub fn update_status_deadline(ctx: Context<UpdateEvent>, deadline: u64) -> Result<()> {
        instructions::update_deadline_event(ctx, deadline)
    }
}
