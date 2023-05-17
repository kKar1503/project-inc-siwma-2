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
			'data:image/png;base64,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',
		date: '1/1/2023',
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
			'data:image/png;base64,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',
		date: '1/1/2023',
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
			'data:image/png;base64,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',
		date: '1/1/2023',
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
