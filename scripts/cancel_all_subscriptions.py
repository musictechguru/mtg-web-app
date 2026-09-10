import stripe
import os
import time

# Set your Stripe Secret Key here or as an environment variable
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

def cancel_all_subscriptions():
    if not stripe.api_key:
        print("Error: STRIPE_SECRET_KEY environment variable not set.")
        return

    print("Fetching active subscriptions...")
    
    try:
        # Get all active and trialing subscriptions
        subscriptions = stripe.Subscription.list(status="all", limit=100)
        
        count = 0
        for sub in subscriptions.auto_paging_iter():
            # Only process active or trialing ones (or past_due)
            if sub.status in ["active", "trialing", "past_due"]:
                print(f"Canceling subscription {sub.id} (Customer: {sub.customer})...")
                
                try:
                    # Cancel immediately
                    stripe.Subscription.delete(sub.id)
                    print(f"  Successfully canceled subscription {sub.id}.")
                    count += 1
                except Exception as e:
                    print(f"  Failed to cancel {sub.id}: {str(e)}")
            
            # Small sleep to avoid rate limits
            time.sleep(0.1)

        print(f"\nDone! Canceled {count} subscriptions immediately.")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    print("WARNING: This will immediately cancel all active Stripe subscriptions.")
    confirm = input("Are you sure you want to proceed? (yes/no): ")
    if confirm.lower() == 'yes':
        cancel_all_subscriptions()
    else:
        print("Cancellation aborted.")
