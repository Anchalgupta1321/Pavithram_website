import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ padding: '10rem 5%', textAlign: 'center', minHeight: '60vh' }}>
      <h2 style={{ fontSize: '2rem', color: 'var(--color-primary-red)', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem' }}>Could not find requested resource</p>
      <Link href="/" style={{
        padding: '0.8rem 2rem',
        backgroundColor: 'var(--color-primary-red)',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '50px',
        fontWeight: 'bold'
      }}>
        Return Home
      </Link>
    </div>
  )
}
