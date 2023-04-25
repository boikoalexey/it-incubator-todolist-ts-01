export type UserType = {
    name: string,
    age: number,
    address: { city: string, house: number },
    laptop: { title: string },
    books: BookType
}

export type BookType = Array<string>
export type CompaniesType = {
    companies: Array<{ id: number, title: string}>
}


export const updateLaptop = (u: UserType, laptop: string) => {
    return {
        ...u,
        laptop: {
            ...u.laptop,
            title: laptop
        }
    }
}

export const addNewBook = (u: UserType, newBooks: BookType) => {
    return {
        ...u,
        books: [...u.books.concat(newBooks)]
    }
}

export const updateBook = (u: UserType, oldBook: string, newBook: string) => ({
    ...u,
    books: u.books.map( b => b === oldBook ? newBook : b)
})

export const updateCompanyTitle = (u: UserType & CompaniesType, id: number, title: string) => ({
        ...u,
        companies: u.companies.map(c => c.id === id ? {...c, title: title} : c)
})

