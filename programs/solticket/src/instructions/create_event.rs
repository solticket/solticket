use anchor_lang::prelude::*;

use crate::state::*;

#[derive(Accounts)]
pub struct CreateEvent<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 256 + 1024 + 256 + 8 + 4 + 1 + 32
    )]
    pub event: Account<'info, Event>,
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 32 + 32 + 4 + 4 + 1
    )]
    pub collection: Account<'info, NFTCollection>,
    pub system_program: Program<'info, System>,
}

pub fn create_event(ctx: Context<CreateEvent>, event_data: EventData) -> Result<()> {
    let event = &mut ctx.accounts.event;
    // let collection = &mut ctx.accounts.collection;

    event.authority = ctx.accounts.authority.key();
    event.title = event_data.title;
    event.description = event_data.description;
    event.location = event_data.location;
    event.category = event_data.category;
    event.deadline = event_data.deadline;
    event.ticket_count = event_data.ticket_count;
    // event.minted_count = 0;



    Ok(())
}