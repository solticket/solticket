use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("L'événement n'est pas en vente")]
    EventNotOnSale,
    #[msg("Tous les billets ont été vendus")]
    SoldOut,
    #[msg("Vous n'êtes pas le propriétaire de ce billet")]
    NotTicketOwner,
    #[msg("Le billet n'est pas transférable")]
    TicketNotTransferable,
    #[msg("L'événement n'est pas en cours")]
    EventNotRunning,
    #[msg("Le billet a déjà été utilisé")]
    TicketAlreadyUsed,
    #[msg("Le billet a déjà été brûlé")]
    TicketAlreadyBurned,
    #[msg("Transition de statut d'événement invalide")]
    InvalidStatusTransition,
}