# db-cost-visualisation

Webapp to visualise cost of database

## Datatype Sizing Table

| Datatype              | Size (bits) |
| --------------------- | ----------- |
| Array                 | 8000000     |
| Bit                   | 1           |
| Boolean               | 16          |
| Byte                  | 8           |
| Date                  | 128         |
| Decimal               | 512000      |
| Float                 | 64          |
| Integer               | 32          |
| String                | 512000      |
| Timestamp/Timestamptz | 96          |
| UUID                  | 128         |

## Database Sizing Table

Calculations all in `bits`

The tables `access_tokens`, `refresh_tokens`, and `sibkeys` are all tables that will not scale with the number of users and listings etc

For **`text`**, each character is 1 bit and it is dynamic in size

For **`numeric`**, every 4 additional digits is 16 bits eg. 1234 is 16 bits, 1234.5678 is 32 bits

The size of an array depends on the datatype and the size of the elements within it

| DB Table                   | Calculations Per Row (bits)                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| `access_token`             | 32 + `text` + 32 + 128 + 16 + 96 + 96 + 96                                                     |
| `advertisements`           | 32 + 32 + `text` + `text` + `text` + 16 + 96 + 96 + 96 + 96                                    |
| `categories_parameters`    | 32 + 32 + 16 + 96 + 96                                                                         |
| `category`                 | 32 + `text` + `text` + `text` + `text` + 16 + 96 + 96                                          |
| `clicks`                   | 32 + 32 + 128 + 16 + 96                                                                        |
| `companies`                | 32 + `text` + `text` + `text` + `text` + 16 + 96                                               |
| `companies_bookmarks`      | 32 + 128 + 32 + 96                                                                             |
| `companies_comments`       | 32 + 32 + `text` + 96                                                                          |
| `invite`                   | 32 + `text` + `text` + `text` + 96 + 32 + 96                                                   |
| `listing`                  | 32 + `text` + `text` + `numeric` + 16 + 16 + 16 + 16 + 16 + 32 + `listingtype` + 128 + 96 + 96 |
| `listing_bookmarks`        | 32 + 128 + 32 96                                                                               |
| `listing_images`           | 32 + 32 + `text` + 96 + 96                                                                     |
| `listing_parameters_value` | 32 + 32 + `text` + 96 + 96                                                                     |
| `messages`                 | 32 + 128 + 128 + 16 + 96 + `contenttype` + 32 + `text`                                         |
| `notification_settings`    | 32 + 128 + `notificationtype`                                                                  |
| `offers`                   | 32 + 32 + 32 + 64 + 16                                                                         |
| `pararameter`              | 32 + `parametertype` + `datatype` + `text` + `text` + 16 + 96 + 96                             |
| `parameter_choices`        | 32 + array(`text`) + 96 + 96                                                                   |
| `refresh_tokens`           | 32 + `text` + 128 + 16 + 96 + 96 + 96                                                          |
| `rooms`                    | 128 + 128 + 128 + 96 + 32                                                                      |
| `sibkeys`                  | `text` + 32 + `text`                                                                           |
| `user_bookmarks`           | 32 + 128 + 128 + 96                                                                            |
| `users`                    | 128 + `text` + `text` + `text` + `text` + `text` + `usercontacts` + 32 + 16 + 32 + 96 + `text` |
| `users_comments`           | 32 + 128 + `text`+ 96                                                                          |

## Custom Enum Sizing + Values Table

Each enum value is 32 bits

| Enum Name          | Enum Values                                                  |
| ------------------ | ------------------------------------------------------------ |
| `contenttype`      | `[text, file, image, offer]`                                 |
| `datatype`         | `[string, number, boolean]`                                  |
| `listingtype`      | `[BUY, SELL]`                                                |
| `notificationtype` | `[TAB1, TAB2]`                                               |
| `parametertype`    | `[WEIGHT, DIMENSION, TWO CHOICES, MANY CHOICES, OPEN ENDED]` |
| `usercontacts`     | `[whatsapp, phone, telegram, facebook, email]`               |

## Default Values

Number of companies (default 200)
Number of user per companies (default 1)
% users active (this is what we use to calculate the scale) (default 100%)
Number of listing per user per month (default 6)
Number of chat opened per listing (default 6)
Number of messages per chat (default 15)
Number of categories (default 25)
Number of Params per categories (default 10)
Number of bookmarks per user (default 10)
