import { useRouter } from "next/router";

export default function Insurance() {
    const router = useRouter()
    const { id } = router.query

    return (
        <p>Page ID: {id}</p>
    )
}
