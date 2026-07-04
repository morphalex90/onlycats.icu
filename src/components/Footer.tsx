import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__logo">OnlyCats</div>
                <nav className="footer__nav" aria-label="Footer">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <a href="https://t.me/+C6ZhfIzJVL84M2M0" target="_blank" rel="noreferrer">
                        Telegram
                    </a>
                </nav>
                <div className="footer__copyright">
                    <span>&copy; {new Date().getFullYear()} Mor</span>
                    <span> - </span>
                    <a href="https://www.buymeacoffee.com/morphalex90" target="_blank" rel="noreferrer">
                        Buy me a 🍺
                    </a>
                </div>
            </div>
        </footer>
    )
}
