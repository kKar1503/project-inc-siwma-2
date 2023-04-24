import { PrismaClient } from '@prisma/client';

// import { Categories } from './tables/category';
// import { Companies } from './tables/companies';
// import { Users } from './tables/users';
// import { Listings } from './tables/listing';
// import { Parameters } from './tables/parameter';
// import { Advertisements } from './tables/advertisements';
// import { CategoriesParameters } from './tables/categories_parameters';
// import { Clicks } from './tables/clicks';
// import { CompaniesComments } from './tables/companies_comments';
// import { CompaniesBookmarks } from './tables/companies_bookmarks';
// import { Invite } from './tables/invite';
// import { ListingBookmarks } from './tables/listing_bookmarks';
// import { ListingImages } from './tables/listing_images';
// import { ListingsParametersValue } from './tables/listings_parameters_value';
// import { NotificationSettings } from './tables/notification_settings';
// import { ParameterChoices } from './tables/parameter_choices';
// import { UserBookmarks } from './tables/user_bookmarks';
// import { UsersComments } from './tables/users_comments';

const prismaClient: PrismaClient = new PrismaClient();

const main = async (): Promise<void> => {
  console.log('Clearing database...');

  await Promise.allSettled([
    prismaClient.category.deleteMany({}),
    prismaClient.companies.deleteMany({}),
    prismaClient.users.deleteMany({}),
    prismaClient.listing.deleteMany({}),
    prismaClient.parameter.deleteMany({}),
    prismaClient.advertisements.deleteMany({}),
    prismaClient.categories_parameters.deleteMany({}),
    prismaClient.clicks.deleteMany({}),
    prismaClient.companies_comments.deleteMany({}),
    prismaClient.companies_bookmarks.deleteMany({}),
    prismaClient.invite.deleteMany({}),
    prismaClient.listing_bookmarks.deleteMany({}),
    prismaClient.listing_images.deleteMany({}),
    prismaClient.listings_parameters_value.deleteMany({}),
    prismaClient.notification_settings.deleteMany({}),
    prismaClient.parameter_choices.deleteMany({}),
    prismaClient.user_bookmarks.deleteMany({}),
    prismaClient.users_comments.deleteMany({}),
  ]);

  console.log('Database cleared');

  console.log('Resetting sequences...');

  await Promise.allSettled([
    prismaClient.$executeRaw`ALTER SEQUENCE public.advertisements_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.category_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.clicks_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.companies_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.companies_bookmarks_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.companies_comments_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.invite_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.listing_bookmarks_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.listing_images_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.listing_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.notification_settings_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.parameter_choices_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.parameter_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.user_bookmarks_seq RESTART WITH 1;`,
    prismaClient.$executeRaw`ALTER SEQUENCE public.users_comments_seq RESTART WITH 1;`,
  ]);

  // console.log('Sequences reset');
  // console.log('Seeding public.category...');

  // const { count: categoryCount } = await prismaClient.category.createMany({
  //   data: Categories,
  // });

  // console.log(`Seeded ${categoryCount} rows into public.category`);
  // console.log('Seeding public.companies...');

  // const { count: companiesCount } = await prismaClient.companies.createMany({
  //   data: Companies,
  // });

  // console.log(`Seeded ${companiesCount} rows into public.companies`);
  // console.log('Seeding public.users...');

  // const { count: usersCount } = await prismaClient.users.createMany({
  //   data: Users,
  // });

  // console.log(`Seeded ${usersCount} rows into public.users`);
  // console.log('Seeding public.listing...');

  // const { count: listingCount } = await prismaClient.listing.createMany({
  //   data: Listings,
  // });

  // console.log(`Seeded ${listingCount} rows into public.listing`);
  // console.log('Seeding public.parameter...');

  // const { count: parameterCount } = await prismaClient.parameter.createMany({
  //   data: Parameters,
  // });

  // console.log(`Seeded ${parameterCount} rows into public.parameter`);
  // console.log('Seeding public.advertisements...');

  // const { count: advertisementsCount } = await prismaClient.advertisements.createMany({
  //   data: Advertisements,
  // });

  // console.log(`Seeded ${advertisementsCount} rows into public.advertisements`);
  // console.log('Seeding public.categories_parameters...');

  // const { count: categoriesParametersCount } = await prismaClient.categories_parameters.createMany({
  //   data: CategoriesParameters,
  // });

  // console.log(`Seeded ${categoriesParametersCount} rows into public.categories_parameters`);
  // console.log('Seeding public.clicks...');

  // const { count: clicksCount } = await prismaClient.clicks.createMany({
  //   data: Clicks,
  // });

  // console.log(`Seeded ${clicksCount} rows into public.clicks`);
  // console.log('Seeding public.companies_comments...');

  // const { count: companiesCommentsCount } = await prismaClient.companies_comments.createMany({
  //   data: CompaniesComments,
  // });

  // console.log(`Seeded ${companiesCommentsCount} rows into public.companies_comments`);
  // console.log('Seeding public.companies_bookmarks...');

  // const { count: companiesBookmarksCount } = await prismaClient.companies_bookmarks.createMany({
  //   data: CompaniesBookmarks,
  // });

  // console.log(`Seeded ${companiesBookmarksCount} rows into public.companies_bookmarks`);
  // console.log('Seeding public.invite...');

  // const { count: inviteCount } = await prismaClient.invite.createMany({
  //   data: Invite,
  // });

  // console.log(`Seeded ${inviteCount} rows into public.invite`);
  // console.log('Seeding public.listing_bookmarks...');

  // const { count: listingBookmarksCount } = await prismaClient.listing_bookmarks.createMany({
  //   data: ListingBookmarks,
  // });

  // console.log(`Seeded ${listingBookmarksCount} rows into public.listing_bookmarks`);
  // console.log('Seeding public.listing_images...');

  // const { count: listingImagesCount } = await prismaClient.listing_images.createMany({
  //   data: ListingImages,
  // });

  // console.log(`Seeded ${listingImagesCount} rows into public.listing_images`);
  // console.log('Seeding public.listings_parameters_value...');

  // const { count: listingsParametersValueCount } =
  //   await prismaClient.listings_parameters_value.createMany({
  //     data: ListingsParametersValue,
  //   });

  // console.log(`Seeded ${listingsParametersValueCount} rows into public.listings_parameters_value`);
  // console.log('Seeding public.notification_settings...');

  // const { count: notificationSettingsCount } = await prismaClient.notification_settings.createMany({
  //   data: NotificationSettings,
  // });

  // console.log(`Seeded ${notificationSettingsCount} rows into public.notification_settings`);
  // console.log('Seeding public.parameter_choices...');

  // const { count: parameterChoicesCount } = await prismaClient.parameter_choices.createMany({
  //   data: ParameterChoices,
  // });

  // console.log(`Seeded ${parameterChoicesCount} rows into public.parameter_choices`);
  // console.log('Seeding public.user_bookmarks...');

  // const { count: userBookmarksCount } = await prismaClient.user_bookmarks.createMany({
  //   data: UserBookmarks,
  // });

  // console.log(`Seeded ${userBookmarksCount} rows into public.user_bookmarks`);
  // console.log('Seeding public.users_comments...');

  // const { count: usersCommentsCount } = await prismaClient.users_comments.createMany({
  //   data: UsersComments,
  // });

  // console.log(`Seeded ${usersCommentsCount} rows into public.users_comments`);
};

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
