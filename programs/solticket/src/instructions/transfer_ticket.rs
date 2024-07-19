// use anchor_lang::prelude::*;
// use anchor_spl::token::{self, Token, TokenAccount};
// // use crate::state::*;

// #[derive(Accounts)]
// pub struct TransferTicket<'info> {
//     #[account(mut)]
//     pub from: Signer<'info>,
//     /// CHECK: This is safe as we're only transferring to this account
//     pub to: AccountInfo<'info>,
//     #[account(mut)]
//     pub ticket: Account<'info, Ticket>,
//     #[account(mut)]
//     pub from_token_account: Account<'info, TokenAccount>,
//     #[account(mut)]
//     pub to_token_account: Account<'info, TokenAccount>,
//     pub token_program: Program<'info, Token>,
// }

// pub fn handler(ctx: Context<TransferTicket>) -> Result<()> {
//     let from = &ctx.accounts.from;
//     let to = &ctx.accounts.to;
//     let ticket = &mut ctx.accounts.ticket;

//     // Vérifier que le sender est bien le propriétaire du ticket
//     require!(ticket.owner == *from.key, ErrorCode::NotTicketOwner);

//     // Vérifier que le ticket est transférable
//     // require!(ticket.status == TicketStatus::Active, ErrorCode::TicketNotTransferable);

//     // Transférer le token SPL
//     let cpi_accounts = token::Transfer {
//         from: ctx.accounts.from_token_account.to_account_info(),
//         to: ctx.accounts.to_token_account.to_account_info(),
//         authority: from.to_account_info(),
//     };
//     let cpi_program = ctx.accounts.token_program.to_account_info();
//     let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
//     token::transfer(cpi_ctx, 1)?;

//     // Mettre à jour le propriétaire du ticket
//     ticket.owner = *to.key;
//     // ticket.status = TicketStatus::Transferred;

//     // Émettre un événement de transfert si nécessaire
//     emit!(TicketTransferred {
//         ticket_id: ticket.ticket_id,
//         from: *from.key,
//         to: *to.key,
//     });

//     Ok(())
// }

// #[event]
// pub struct TicketTransferred {
//     pub ticket_id: Pubkey,
//     pub from: Pubkey,
//     pub to: Pubkey,
// }