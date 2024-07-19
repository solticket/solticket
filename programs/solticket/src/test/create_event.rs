use anchor_lang::prelude::*;
use solana_program_test::*;
use solana_sdk::{signature::Keypair, signer::Signer};
use solticket::{state::*, instructions::*};

#[tokio::test]
async fn test_create_event() {
    let program_id = Pubkey::new_unique();
    let (mut banks_client, payer, recent_blockhash) = ProgramTest::new(
        "solticket",
        program_id,
        processor!(solticket::entry),
    )
    .start()
    .await;

    let event_keypair = Keypair::new();
    let collection_keypair = Keypair::new();

    let rent = banks_client.get_rent().await.unwrap();
    let event_account_rent = rent.minimum_balance(Event::LEN);
    let collection_account_rent = rent.minimum_balance(NFTCollection::LEN);

    let event_data = EventData {
        title: "Test Event".to_string(),
        description: "A test event".to_string(),
        location: "Test Location".to_string(),
        category: Category::VIRTUAL,
        deadline: 1700000000,
        ticket_count: 100,
    };

    let mut transaction = Transaction::new_with_payer(
        &[create_event(
            ctx.accounts.clone(),
            event_data.clone(),
        )],
        Some(&payer.pubkey()),
    );
    transaction.sign(&[&payer, &event_keypair, &collection_keypair], recent_blockhash);

    banks_client.process_transaction(transaction).await.unwrap();

    // Vérification que l'événement a été créé correctement
    let event_account = banks_client
        .get_account(event_keypair.pubkey())
        .await
        .unwrap()
        .unwrap();
    let event = Event::try_deserialize(&mut event_account.data.as_ref()).unwrap();

    // Vérification que la collection a été créée correctement
    let collection_account = banks_client
        .get_account(collection_keypair.pubkey())
        .await
        .unwrap()
        .unwrap();
    let collection = NFTCollection::try_deserialize(&mut collection_account.data.as_ref()).unwrap();

    // Assertions pour vérifier les champs de l'événement et de la collection
    assert_eq!(event.authority, payer.pubkey());
    assert_eq!(event.title, event_data.title);
    assert_eq!(event.description, event_data.description);
    assert_eq!(event.location, event_data.location);
    assert_eq!(event.category, event_data.category);
    assert_eq!(event.deadline, event_data.deadline);
    assert_eq!(event.ticket_count, event_data.ticket_count);
    assert_eq!(event.status, EventStatus::CREATE);
    assert_eq!(event.collection, collection_keypair.pubkey());

    assert_eq!(collection.event, event_keypair.pubkey());
    assert_eq!(collection.authority, payer.pubkey());
    assert_eq!(collection.total_supply, event_data.ticket_count);
    assert_eq!(collection.minted_count, 0);
    assert_eq!(collection.status, CollectionStatus::CREATED);
}
