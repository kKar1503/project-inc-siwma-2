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

