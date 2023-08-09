// // require dotenv package
// require('dotenv').config()
// const { CONNECTION_STRING } = process.env

// const { Sequelize, DataTypes } = require('sequelize');

// // Initialize Sequelize with the database connection details from .env
// const sequelize = new Sequelize(CONNECTION_STRING, {
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized:false
//         }
//     }
// });

// // Define the ColorLabel model
// const ColorLabel = sequelize.define('ColorLabel', {
//     moodLabel: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     color: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// });

// const DayWithColor = sequelize.define('DayWithColor', {
//     day: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     color: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     colorLabelId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: ColorLabel, // Reference the ColorLabel model
//             key: 'id',         // Reference the primary key of ColorLabel
//         },
//     },
// });
  
// // Sync the model with the database
// (async () => {
//     await sequelize.sync();
//     console.log('Database synced');
// })();

// // Controller methods
// module.exports = {
//     createColorLabel: async (req, res) => {
//         const { moodLabel, color } = req.body;
      
//         try {
//             const newColorLabel = await ColorLabel.create({ moodLabel, color });
//             res.status(201).json({ message: 'Color label saved successfully', newColorLabel });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Error saving color label' });
//         }
//     },
    
//     getColorLabels: async (req, res) => {
//         try {
//             const colorLabels = await ColorLabel.findAll();
//             res.status(200).json(colorLabels);
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Error retrieving color labels' });
//         }
//     },

//     updateColorLabel: async (req, res) => {
//         const { id } = req.params;
//         const { color } = req.body;
        
//         try {
//             const colorLabel = await ColorLabel.findByPk(id);
//             if (!colorLabel) {
//                 return res.status(404).json({ error: 'Color label not found' });
//             }
          
//             colorLabel.color = color;
//             await colorLabel.save();
          
//             res.status(200).json({ message: 'Color label updated successfully', colorLabel });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Error updating color label' });
//         }
//     },
//     deleteColorLabel: async (req, res) => {
//         const { id } = req.params;
        
//         try {
//             const colorLabel = await ColorLabel.findByPk(id);
//             if (!colorLabel) {
//                 return res.status(404).json({ error: 'Color label not found' });
//           }
          
//           await colorLabel.destroy();
          
//           res.status(200).json({ message: 'Color label deleted successfully' });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Error deleting color label' });
//         }
//     },

//     createDayWithColor: async (req, res) => {
//         const { day, color, colorLabelId } = req.body;
      
//         try {
//             const newDayWithColor = await DayWithColor.create({ day, color, colorLabelId });
//             res.status(201).json({ message: 'Day with color saved successfully', newDayWithColor });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Error saving day with color' });
//         }
//     },
// };