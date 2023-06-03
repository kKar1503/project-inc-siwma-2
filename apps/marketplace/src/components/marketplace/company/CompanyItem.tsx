import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { Company } from '@/utils/api/client/zod/companies';

// Middleware
import bookmarkCompany from '@/middlewares/bookmarks/bookmarkCompany';

export type CompanyItemData = {
  data: Company;
  updateBookmarkData: () => void;
};

const useBookmarkCompany = (companyID: string, updateBookmarkData: () => void) => {
  const [isBookmarked, setIsBookmarked] = useState(true);

  const handleBookmarkCompany = async () => {
    if (isBookmarked) {
      await bookmarkCompany(companyID);
      setIsBookmarked(false);
      updateBookmarkData();
    }
  };

  return {
    isBookmarked,
    handleBookmarkCompany,
  };
};

const CompanyItem = ({ data, updateBookmarkData }: CompanyItemData) => {
  const [isSm] = useResponsiveness(['sm']);
  const { isBookmarked, handleBookmarkCompany } = useBookmarkCompany(data.id, updateBookmarkData);

  return (
    <Card sx={{ height: isSm ? 240 : 280 }}>
      <div style={{ position: 'relative' }}>
        {data.image ? (
          <CardMedia
            component="img"
            height={isSm ? 120 : 140}
            alt="company image"
            src={data.image}
          />
        ) : (
          <CardMedia
            component="div"
            style={{ backgroundColor: 'gray', height: isSm ? 120 : 140 }}
          />
        )}
        <IconButton
          aria-label="bookmark"
          color={isBookmarked ? 'primary' : 'default'}
          style={{ position: 'absolute', top: 8, right: 8 }}
          onClick={handleBookmarkCompany}
          sx={({ spacing, palette }) => ({
            p: spacing(0),
            color: isBookmarked ? palette.warning[100] : palette.grey[500],
          })}
        >
          <BookmarkIcon fontSize="large" />
        </IconButton>
      </div>
      <CardContent>
        <Typography variant="h6" align="center" fontSize={isSm ? '1rem' : '1.25rem'}>
          {data.name}
        </Typography>
        {data.bio && (
          <Typography variant="body1" align="center" fontSize={isSm ? '0.75rem' : '1rem'}>
            {data.bio.length > 50 ? `${data.bio.slice(0, 50)}...` : data.bio}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyItem;
