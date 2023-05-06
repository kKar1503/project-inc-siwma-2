function calculateUserBits(numCompany, numUsersperCompany, percentUsers) {
  const numofUsers = Math.round(
    (numCompany * numUsersperCompany * percentUsers) / 100,
  );
  return numofUsers * 1134;
}

function listingBits(numListings) {
  return numListings * 3891;
}

function roomsBits(numRooms) {
  return numRooms * 512;
}

function messagesBits(numMessages) {
  return numMessages * 7792;
}

function categoriestoBits(numCategories) {
  return numCategories * 1633;
}

function paramsToBits(numParams) {
  return numParams * 593;
}

function advertisementsToBits(numAdvertisements) {
  return numAdvertisements * 49365;
}

function listingBookmarkToBits(numListingBookmarks) {
  return numListingBookmarks * 288;
}

function companyBookmarkToBits(numCompanyBookmarks) {
  return numCompanyBookmarks * 288;
}

function companyCommentsToBits(numCompanyComments) {
  return numCompanyComments * 310;
}

function bitsToGiB(bits) {
  const bytes = bits / 8;
  const gibibytes = bytes / 2 ** 30;
  return gibibytes.toFixed(2);
}

function totalCost(gib) {
  let cost = 0;
  if (gib > 10) {
    cost = (gib - 10) * 0.2;
    cost = +cost.toFixed(2); // round to 2 decimal places
  }
  return cost;
}

export const mathLogic = (
  numCompany,
  numUsersperCompany,
  percentUsers,
  numListings,
  numRooms,
  numMessages,
  numCategories,
  numParams,
) => {
  const totalBits = calculateUserBits(numCompany, numUsersperCompany, percentUsers)
    + listingBits(numListings)
    + roomsBits(numRooms)
    + messagesBits(numMessages)
    + categoriestoBits(numCategories)
    + paramsToBits(numParams)
    + advertisementsToBits(4)
    + listingBookmarkToBits(4)
    + companyBookmarkToBits(4)
    + companyCommentsToBits(2);
  const totalGB = bitsToGiB(totalBits);
  const totalCosts = totalCost(totalGB);
  return totalCosts;
};
