export default function CategoryPage({ params }: { params: { name: string } }) {
    const {name} = params;

    return (
        <div>
            {name}
        </div>
    )
}