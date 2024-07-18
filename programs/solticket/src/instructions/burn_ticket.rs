use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Mint};

use crate::state::*;
// use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct BurnTicket<'info> {
    #[account(mut)]
    pub ticket_nft: Account<'info, TicketNFT>,
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

pub fn burn_ticket(ctx: Context<BurnTicket>) -> Result<()> {
    let ticket_nft = &mut ctx.accounts.ticket_nft;

    // require!(ticket_nft.owner == ctx.accounts.owner.key(), ErrorCode::NotTicketOwner);
    // require!(ticket_nft.status != NFTStatus::BURNED, ErrorCode::TicketAlreadyBurned);

    token::burn(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Burn {
                mint: ctx.accounts.mint.to_account_info(),
                from: ctx.accounts.token_account.to_account_info(),
                authority: ctx.accounts.owner.to_account_info(),
            },
        ),
        1,
    )?;

    ticket_nft.status = NFTStatus::BURNED;

    Ok(())
}