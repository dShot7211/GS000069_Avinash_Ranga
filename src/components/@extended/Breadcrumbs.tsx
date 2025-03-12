import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// project import
import MainCard from 'components/MainCard';
import logo from '../../../adventra_fav_icon.png';

export default function Breadcrumbs({ navigation, title, ...others }: any) {
  // console.log('navigation', navigation);
  const location = useLocation();
  // console.log('location', location?.pathname);
  const [main, setMain] = useState<any>();
  // console.log('main', main);
  const [item, setItem] = useState<any>();
  // console.log('item', item);

  // set active item state
  const getCollapse = (menu: any) => {
    if (menu.children) {
      menu.children.filter((collapse: any) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === 'item') {
          if (location.pathname === collapse.url) {
            // console.log('menu item', menu);
            // console.log('collapse item', collapse);
            setMain(menu);
            setItem(collapse);
          }
        } else if (collapse.type && collapse.type === 'hide') {
          const taskUrlArr = location?.pathname?.split('/');
          const urlName = taskUrlArr[taskUrlArr.length - 2];
          // console.log('menu hide', menu);
          // console.log('collapse hide', collapse);
          // console.log('location', location?.pathname);
          // console.log('urlName', urlName);
          if (urlName === collapse.id) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation?.items?.map((menu: any) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu);
      }
      return false;
    });
  });

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';
  let moreContent = '';

  // collapse item
  if (main && main.type === 'collapse') {
    mainContent = (
      <Typography component={Link} to={document.location.pathname} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
        {main.title}
      </Typography>
    );
  }
  // if (location.pathname.split('/').length > 2) {
  //   const taskUrlArr = location.pathname.split('/');
  //   moreContent = (
  //     <Typography variant="subtitle1" color="textPrimary">
  //       {taskUrlArr.slice(2).join('/')}
  //     </Typography>
  //   )
  // }

  // items
  if ((item && item?.type === 'item') || (item && item?.type === 'hide')) {
    if (location.pathname !== item?.url && item?.children) {
      item?.children.map((item: any) => {
        if (location.pathname === item.url) {
          moreContent = ` / ${item.title}`;
        }
      });
    }
    itemTitle = item?.title;
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {itemTitle + moreContent}
      </Typography>
    );
    // if ((item && item.type === 'item') || (item && item.type === 'hide')) {
    //   itemTitle = item.title;
    //   itemContent = (
    //     <Typography variant="subtitle1" color="textPrimary">
    //       {itemTitle}
    //     </Typography>
    //   );

    // main
    if (item?.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent', px: 3.5, pt: 2 }} {...others} content={false}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
            <Grid item>
              <MuiBreadcrumbs aria-label="breadcrumb" sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="favicon" width="15px" />
                <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                  Home
                </Typography>
                {mainContent}
                {itemContent}
              </MuiBreadcrumbs>
            </Grid>
            {/* {title && (
              <Grid item sx={{ mt: 2 }}>
                <Typography variant="h5">{item.title}</Typography>
              </Grid>
            )} */}
          </Grid>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
}

Breadcrumbs.propTypes = {
  card: PropTypes.bool,
  custom: PropTypes.bool,
  divider: PropTypes.bool,
  heading: PropTypes.string,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  links: PropTypes.array,
  maxItems: PropTypes.number,
  rightAlign: PropTypes.bool,
  separator: PropTypes.any,
  title: PropTypes.bool,
  titleBottom: PropTypes.bool,
  sx: PropTypes.any,
  others: PropTypes.any
};
