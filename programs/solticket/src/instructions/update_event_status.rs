use anchor_lang::prelude::*;
use crate::state::*;
// use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct UpdateEventStatus<'info> {
    #[account(mut, has_one = authority)]
    pub event: Account<'info, Event>,
    pub authority: Signer<'info>,
}

pub fn update_event_status(ctx: Context<UpdateEventStatus>, _new_status: EventStatus) -> Result<()> {
    let _event = &mut ctx.accounts.event;

    // match (event.status, new_status) {
    //     (EventStatus::CREATE, EventStatus::SALE) => {},
    //     (EventStatus::SALE, EventStatus::RUN) => {},
    //     (EventStatus::RUN, EventStatus::CLOSED) => {},
    //     _ => return Err(ErrorCode::InvalidStatusTransition.into()),
    // }

    // event.status = new_status;
    Ok(())
}