// use anchor_lang::prelude::*;
// use crate::state::*;
// // A RETRAVAILLER 
// #[derive(Accounts)]
// pub struct GetUserTickets<'info> {
//     pub user: Signer<'info>,
// }

// #[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
// pub struct TicketInfo {
//     pub ticket_id: Pubkey,
//     pub event_id: Pubkey,
//     pub seat_number: u16,
//     pub status: TicketStatus,
// }

// pub fn get_user_tickets(ctx: Context<GetUserTickets>) -> Result<Vec<TicketInfo>> {
//     let user = &ctx.accounts.user;
//     let mut tickets = Vec::new();

//     // Récupérer tous les tickets de l'utilisateur
//     let (ticket_registry_pda, _) = Pubkey::find_program_address(
//         &[b"ticket_registry", user.key().as_ref()],
//         ctx.program_id
//     );

//     if let Ok(ticket_registry) = Account::<TicketRegistry>::try_from(&ticket_registry_pda) {
//         for ticket in ticket_registry.tickets.iter() {
//             if ticket.owner == *user.key() {
//                 tickets.push(TicketInfo {
//                     ticket_id: ticket.ticket_id,
//                     event_id: ticket.event_id,
//                     seat_number: ticket.seat_number,
//                     status: ticket.status,
//                 });
//             }
//         }
//     }

//     Ok(tickets)
// }

// // Structure hypothétique pour le registre des tickets
// #[account]
// pub struct TicketRegistry {
//     pub tickets: Vec<Ticket>,
// }

// #[account]
// pub struct Ticket {
//     pub ticket_id: Pubkey,
//     pub event_id: Pubkey,
//     pub owner: Pubkey,
//     pub seat_number: u16,
//     pub status: TicketStatus,
// }

// #[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq)]
// pub enum TicketStatus {
//     Active,
//     Used,
//     Expired,
//     Transferred,
// }