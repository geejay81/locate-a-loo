const Footer = () => {

    return (
        <footer className="text-muted-foreground text-center text-sm">
            <div className="mb-4 mx-auto max-w-4xl px-4 py-12">
                <p>
                    Locate A Loo is a portfolio project created for demonstration purposes.
                </p>
                <p className="mt-2">
                    Toilet locations and facility information are sourced from OpenStreetMap and
                    may be incomplete, inaccurate, or out of date.
                </p>
                <p className="mt-2 font-bold">
                    Data © OpenStreetMap contributors.
                </p>
            </div>
        </footer>
    )
}

export default Footer;