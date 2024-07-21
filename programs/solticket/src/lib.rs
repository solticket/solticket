declare_id!("2dVsKN5P2MsByA5pWCxJvBfTLjCb2L1m1rPmHKDu3HgS");

use anchor_lang::prelude::*;
use std::str::FromStr;
pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

use instructions::*;
#[program]
pub mod solticket {

    use state::Category;

    use super::*;

    pub fn create_event(
        ctx: Context<CreateEvent>,
        title: String,
        description: String,
        location: String,
        _category: String,
        start_date: u64,
        total_seats: u32,
        image_url: String,
    ) -> Result<()> {
        let category_enum = Category::from_str("VIRTUAL").unwrap();
        instructions::create_event(
            ctx,
            title,
            description,
            location,
            category_enum,
            start_date,
            total_seats,
            image_url,
        )
    }

    pub fn update_status_event(ctx: Context<UpdateEvent>, status: String) -> Result<()> {
        instructions::update_status_event(ctx, status)
    }

    pub fn update_start_date_event(ctx: Context<UpdateEvent>, deadline: u64) -> Result<()> {
        instructions::update_start_date_event(ctx, deadline)
    }
}
