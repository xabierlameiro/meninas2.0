export default function PreviewPage() {
    return (
        <form action="/api/checkout" method="POST">
            <section>
                <button type="submit" role="link">
                    Checkout
                </button>
            </section>
        </form>
    );
}
