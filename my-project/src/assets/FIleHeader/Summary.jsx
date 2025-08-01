// // src/components/Summary.jsx
// import React from 'react';
// import { Paper, Typography, Grid, Box } from '@mui/material';

// const Summary = ({ totals }) => {
//   return (
//     <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Summary
//       </Typography>
      
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Box display="flex" justifyContent="space-between">
//             <Typography variant="subtitle1">Total Assessable Value:</Typography>
//             <Typography variant="h6">
//               {Number(totals.totalAssessableValue).toFixed(4)}
//             </Typography>
//           </Box>
//         </Grid>
        
//         <Grid item xs={12} md={6}>
//           <Box display="flex" justifyContent="space-between">
//             <Typography variant="subtitle1">Total Duty Value:</Typography>
//             <Typography variant="h6">
//               {Number(totals.totalDutyValue).toFixed(4)}
//             </Typography>
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// export default Summary;
































// src/components/Summary.jsx
import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';

const Summary = ({ totals }) => {
  // Helper function to safely format numbers
  const safeToFixed = (value, digits = 4) => {
    if (typeof value === 'number' && !isNaN(value)) {
      return value.toFixed(digits);
    }
    return (0).toFixed(digits);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Total Assessable Value:</Typography>
            <Typography variant="h6">
              {safeToFixed(totals.totalAssessableValue)}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Total Duty Value:</Typography>
            <Typography variant="h6">
              {safeToFixed(totals.totalDutyValue)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Summary;
