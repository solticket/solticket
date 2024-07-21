use anchor_lang::prelude::*;
use std::str::FromStr;
use crate::{state::EventStatus, state::Event, state::Category};

pub fn create_event(
    ctx: Context<CreateEvent>,
    title: String,
    description: String,
    location: String,
    category: Category,
    start_date: u64,
    ticket_count: u32,
) -> Result<()> {
    let event_account = &mut ctx.accounts.event;
    event_account.authority = ctx.accounts.signer.key();
    event_account.title = title;
    event_account.description = description;
    event_account.location = location;
    event_account.category = category;
    event_account.start_date = start_date;
    event_account.ticket_count = ticket_count;
    event_account.status = EventStatus::CREATE;

    Ok(())
}


pub fn update_status_event(
    ctx: Context<UpdateEvent>,
    status: String
) -> Result<()> {
    let event_account = &mut ctx.accounts.event;
    let status_enum = EventStatus::from_str(&status).unwrap();
    event_account.status = status_enum;
    Ok(())
}

pub fn update_start_date_event(ctx: Context<UpdateEvent>, start_date: u64) -> Result<()> {
    let event_account = &mut ctx.accounts.event;

    event_account.start_date = start_date;

    Ok(())
}

#[derive(Accounts)]
pub struct CreateEvent<'info> {
    #[account(init, payer = signer, space = 8 + 32 + 32 + 8 + 4 + 32)]
    pub event: Account<'info, Event>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateEvent<'info> {
    #[account(mut, has_one = authority)]
    pub event: Account<'info, Event>,
    pub authority: Signer<'info>,
}
