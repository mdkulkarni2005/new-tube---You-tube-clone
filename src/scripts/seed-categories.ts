// TODO: Create a script to seed categories

import { db } from "@/db"
import { categories } from "@/db/schema"

const categorieNames = [
    "Cars and vehicles",
    "Comedy",
    "Education",
    "Gaming",
    "Entertainment",
    "Film and Animation",
    "How-to and style",
    "Music",
    "News and politics",
    "People and blogs",
    "Pets and animals",
    "Science and technology",
    "Sports",
    "Travel and events",
]

async function main() {
    console.log("Seeding categories...")
    
    try {
        const values = categorieNames.map((name) => ({
            name,
            description: `Videos related to ${name.toLocaleLowerCase()}`
        }))

        await db.insert(categories).values(values)

        console.log("Categories seeded successfully!")
    } catch (error) {
        console.error("Error seeding categories: ", error)
        process.exit(1)
    }
}
main()