import { useRouter } from "next/router";

export default function Service() {
    const router = useRouter()
    const { id } = router.query

    return (
        <p>Page ID: {id}</p>
    )
}
