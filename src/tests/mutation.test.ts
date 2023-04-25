import {addNewBook, CompaniesType, updateBook, updateCompanyTitle, updateLaptop, UserType} from "./mutation";

test('update laptop', () => {
    let user: UserType = {
        name: 'Alex',
        age: 32,
        address: {
            city: 'NVR',
            house: 90
        },
        laptop: {
            title: 'asus'
        },
        books: ['css', 'html', 'js', 'react']
    }

    const updateUser = updateLaptop(user, 'macbook')

    expect(user).not.toBe(updateUser)
    expect(user.address).toBe(updateUser.address)
    expect(user.laptop).not.toBe(updateUser.laptop)
    expect(user.laptop.title).toBe('asus')
    expect(updateUser.laptop.title).toBe('macbook')
})

test('add new books', () => {
    let user: UserType = {
        name: 'Alex',
        age: 32,
        address: {
            city: 'NVR',
            house: 90
        },
        laptop: {
            title: 'asus'
        },
        books: ['css', 'html', 'js', 'react']
    }

    const updateUser = addNewBook(user, ['vue', 'ts'])

    expect(user).not.toBe(updateUser)
    expect(user.books).toStrictEqual(['css', 'html', 'js', 'react'])
    expect(user.books).not.toBe(updateUser.books)
    expect(updateUser.books[4]).toBe('vue')
    expect(updateUser.books[5]).toBe('ts')
})

test('update book', () => {
    let user: UserType = {
        name: 'Alex',
        age: 32,
        address: {
            city: 'NVR',
            house: 90
        },
        laptop: {
            title: 'asus'
        },
        books: ['css', 'html', 'js', 'react']
    }

    const updateUser = updateBook(user, 'js', 'ts')

    expect(user).not.toBe(updateUser)
    expect(user.books).not.toBe(updateUser.books)
    expect(updateUser.books[2]).toBe('ts')
})

test('update book', () => {
    let user: UserType & CompaniesType = {
        name: 'Alex',
        age: 32,
        address: {
            city: 'NVR',
            house: 90
        },
        laptop: {
            title: 'asus'
        },
        books: ['css', 'html', 'js', 'react'],
        companies: [{ id: 1, title: 'Епам'}, { id: 2, title: 'IT-Incubator'}]
    }

    const updateUser = updateCompanyTitle(user, 1, 'EPAM')

    expect(user).not.toBe(updateUser)
    expect(user.books).toBe(updateUser.books)
    expect(updateUser.companies[0].title).toBe('EPAM')
})