export default function About (
    { children } : { children: React.ReactNode }
)


{
    return (
        <section>
        Esto es info sobre nosotros i fotos:
        {children}
        </section>
    )
}