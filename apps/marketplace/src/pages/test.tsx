'use client'

import React from 'react'
import ChatList from '@/components/marketplace/RTC/ChatList'

interface Chat {
	id: string
	company: string
	category: string
	latestMessage: string
	price: number
	itemName: string
	inProgress: boolean
	date: string
	imageUrl: string
	badgeContent: number
}

const messagesOfChatRoomId1 = [
	{
		id: '365',
		content_type: 'message',
		read: false,
		content: 'hello',
		author: '8fc4060d-5046-458f-b521-9e845b405cf1',
		created_at: '2023-01-12T06:11:49.43002+00:00',
	},
	{
		id: '366',
		content_type: 'image',
		read: false,
		content: 'https://s3.amazonaws.com/mybucket/myimage-20230322T120000Z.jpg',
		author: '8fc4060d-5046-458f-b521-9e845b405cf1',
		created_at: '2023-01-12T06:11:52.43002+00:00',
	},
	{
		id: '367',
		content_type: 'offer',
		read: true,
		offer: 4500,
		author: '6ac846d-5468-3f84-b648-6a544f23e4f5',
		created_at: '2023-01-12T06:11:49.43002+00:00',
	},
]

const messagesOfChatRoomId2 = [
	{
		id: '365',
		content_type: 'message',
		read: false,
		content: 'hello',
		author: '8fc4060d-5046-458f-b521-9e845b405cf1',
		created_at: '2023-01-12T06:11:49.43002+00:00',
	},
	{
		id: '366',
		content_type: 'image',
		read: true,
		content: 'https://s3.amazonaws.com/mybucket/myimage-20230322T120000Z.jpg',
		author: '8fc4060d-5046-458f-b521-9e845b405cf1',
		created_at: '2023-01-12T06:11:52.43002+00:00',
	},
	{
		id: '367',
		content_type: 'offer',
		read: true,
		offer: 4500,
		author: '6ac846d-5468-3f84-b648-6a544f23e4f5',
		created_at: '2023-01-12T06:11:49.43002+00:00',
	},
	{
		id: '369',
		content_type: 'offer',
		read: true,
		offer: 4500,
		author: '6ac846d-5468-3f84-b648-6a544f23e4f5',
		created_at: '2023-01-12T06:11:49.43002+00:00',
	},
]

const messagesOfChatRoomId3 = [
	{
		id: '365',
		content_type: 'message',
		read: true,
		content: 'hello',
		author: '8fc4060d-5046-458f-b521-9e845b405cf1',
		created_at: '2023-01-12T06:11:49.43002+00:00',
	},
	{
		id: '366',
		content_type: 'image',
		read: true,
		content: 'https://s3.amazonaws.com/mybucket/myimage-20230322T120000Z.jpg',
		author: '8fc4060d-5046-458f-b521-9e845b405cf1',
		created_at: '2023-01-12T06:11:52.43002+00:00',
	},
	{
		id: '367',
		content_type: 'offer',
		read: true,
		offer: 4500,
		author: '6ac846d-5468-3f84-b648-6a544f23e4f5',
		created_at: '2023-01-12T06:11:49.43002+00:00',
	},
	{
		id: '369',
		content_type: 'offer',
		read: true,
		offer: 4500,
		author: '6ac846d-5468-3f84-b648-6a544f23e4f5',
		created_at: '2023-01-12T06:11:49.43002+00:00',
	},
]

const allChats: Chat[] = [
	{
		id: '1',
		company: 'ABC Corp',
		category: 'Buying',
		itemName: 'Mild Steel Channel',
		latestMessage: 'Hey, are you still interested in buying?',
		price: 100,
		inProgress: true,
		badgeContent: messagesOfChatRoomId1.filter((message) => !message.read)
			.length,
		imageUrl:
			'https://siwma.org.sg/wp-content/uploads/SIW-logo.png',
		date: '2023-01-12T06:11:49.43002+00:00',
	},
	{
		id: '2',
		company: 'XYZ Corp',
		category: 'Buying',
		latestMessage: 'Sure, what is the price?',
		price: 50,
		inProgress: true,
		itemName: 'Product Name 2',
		badgeContent: messagesOfChatRoomId2.filter((message) => !message.read)
			.length,
		imageUrl:
			'https://siwma.org.sg/wp-content/uploads/SIW-logo.png',
		date: '2023-01-12T06:11:49.43002+00:00',
	},
	{
		id: '3',
		company: 'LMN Corp',
		category: 'Selling',
		latestMessage: 'I can offer 80, what do you think?',
		price: 80,
		inProgress: true,
		itemName: 'Product Name 3',
		badgeContent: messagesOfChatRoomId3.filter((message) => !message.read)
			.length,
		imageUrl:
			'https://siwma.org.sg/wp-content/uploads/SIW-logo.png',
		date: '2023-01-12T06:11:49.43002+00:00',
	},
]
const page = () => (
		<ChatList
			chats={allChats}
			onChange={(e) => {
				const element = e.currentTarget as HTMLInputElement
				const {value} = element
			}}
		/>
	)

export default page
