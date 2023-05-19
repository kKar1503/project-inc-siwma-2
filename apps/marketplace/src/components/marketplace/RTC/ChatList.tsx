

import React, {  useState } from 'react'
import Box from '@mui/material/Box'
import {TextField,alpha} from '@mui/material'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Divider from '@mui/material/Divider'
import Badge from '@mui/material/Badge'
import Image from 'next/image'
import { DateTime } from 'luxon'


export interface Chat {
	id: string
	company: string
	category: string
	latestMessage: string
	price:number
	itemName: string
	inProgress: boolean
	date: string
	imageUrl: string
	badgeContent: number
}
type CategoryType = 'all' | 'Buying' | 'Selling'

const ChatList = ({
	chats,
	onChange,
}: {
	chats: Chat[]
	onChange: (e: React.FormEvent<HTMLInputElement>) => void
}) => {
	const [category, setCategory] = useState<CategoryType>('all')
	const [activeItem, setActiveItem] = useState<number | null>(null)
	const myColor = alpha('#000000', 0.04);
	
	const handleCategoryChange = (event: SelectChangeEvent) => {
		setCategory(event.target.value as CategoryType)
	}

	const filteredChats = (category: CategoryType, chats: Chat[]) => {
		if (category.toLowerCase() === 'all') {
			return chats.filter((chat) => chat.inProgress)
		}
		const filteredItems = chats.filter(
			(chat) =>
				chat.category.toLowerCase() === category.toLowerCase() && chat.inProgress
		)
		return filteredItems
		
	}

	return (
		<>
			<Box sx={{ p: 2 }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
					<Typography
						variant='h6'
						sx={({ palette }) => ({
							color: palette.common.black,
						})}
					>
						Conversations
					</Typography>
					<Typography
						variant='subtitle1'
						sx={{ display: 'flex', alignItems: 'center' }}
					>
						{filteredChats(category, chats).length} Active Chats
					</Typography>
				</Box>
				<FormControl
					variant='outlined'
					size='small'
					sx={{
						width: '120px',
						background: 'none',
						border: 'none',
						mb: 1,
					}}
				>
					<Select
						value={category}
						onChange={handleCategoryChange}
						sx={({ spacing }) => ({
							'& .MuiSelect-select': { p: spacing(0) },
							'& fieldset': {
								border: spacing(0),
							},
							'&::hover': {
								border: spacing(0),
							},
							'&::before': {
								border: spacing(0),
							},
							'&::after': {
								border: spacing(0),
							},
						})}
					>
						<MenuItem value='all'>All</MenuItem>
						<MenuItem value='Buying'>Buying</MenuItem>
						<MenuItem value='Selling'>Selling</MenuItem>
					</Select>
				</FormControl>
			
				<TextField
				InputProps={{ disableUnderline: true }}
				placeholder="Search Message,Listings,username"
				variant="filled"
				fullWidth
				sx={({ spacing }) => ({
				'& .MuiFilledInput-root': {
					background: myColor ,
					borderRadius: '4px',
					'&:hover': {
					background: myColor,
					},
				},
				'& .MuiInputBase-input': {
					padding: '10px 7px',
				},
				'& .MuiOutlinedInput-root': {
					borderRadius: '4px',
					'& fieldset': {
					border: spacing(0),
					outline: 'none',
					},
					'&:hover fieldset': {
					border: spacing(0),
					outline: 'none',
					},
				},
				})}
				
					/>
			</Box>

			<Divider
				sx={({ palette }) => ({
					borderColor: palette.grey[600],
				})}
			/>
			<List sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
				{filteredChats(category, chats).map((chat, index) => (
					<>
						<ListItem
							key={chat.id}
							onClick={() => {
								setActiveItem(index)
							}}
							sx={({ palette }) => ({
								background: activeItem === index ? palette.grey[300] : 'none',
							})}
						>
							<ListItemAvatar>
								<Badge
									overlap='circular'
									color="error"
									badgeContent={chat.badgeContent}
								>
									<Image
										style={{ borderRadius: '100%' }}
										src={chat.imageUrl}
										width={50}
										height={50}
										alt='pic'
									/>
								</Badge>
							</ListItemAvatar>
							<ListItemText>
								<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
									<Typography
										sx={({  typography }) => ({
											fontSize: typography.h6,
										})}
									>
										{chat.company}
									</Typography>
									<Typography
										sx={({  typography }) => ({
											fontSize: typography.body2,
										})}
									>
										{DateTime.fromISO(chat.date)
											.setLocale('en')
											.toFormat('f')}
									</Typography>
								</Box>
								<Typography
									sx={({ typography }) => ({
										fontSize: typography.body1,
									})}
								>
									{' '}
									{chat.itemName}
								</Typography>
								<Typography
									sx={({ typography }) => ({
										fontSize: typography.body1,
									})}
								>
									{chat.latestMessage}
								</Typography>
								<Typography
									sx={({ typography }) => ({
										fontSize: typography.body2,
									})}
								>
									{chat.inProgress
										? 'In progress'
										: `Offered price: $${chat.price}`}
								</Typography>
							</ListItemText>
						</ListItem>
						{filteredChats(category, chats).length - 1 !== index && (
							<Divider
								sx={({ palette }) => ({
									borderColor: palette.grey[600],
								})}
							/>
						)}
					</>
				))}
			</List>
		</>
	)
}
export default ChatList
