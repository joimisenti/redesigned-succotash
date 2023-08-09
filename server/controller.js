// require dotenv package
require('dotenv').config()
const { CONNECTION_STRING } = process.env

const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with the database connection details from .env
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized:false
        }
    }
});

// Define the ColorLabel model
const ColorLabel = sequelize.define('ColorLabel', {
    moodLabel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const DayWithColor = sequelize.define('DayWithColor', {
    day: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    month: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    colorLabelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ColorLabel, // Reference the ColorLabel model
            key: 'id',         // Reference the primary key of ColorLabel
        },
    },
});

// Set up associations
DayWithColor.belongsTo(ColorLabel, {
    foreignKey: 'colorLabelId',
    targetKey: 'id'
});

ColorLabel.hasMany(DayWithColor, {
    foreignKey: 'colorLabelId',
    sourceKey: 'id'
});
  
// Sync the model with the database
(async () => {
    await sequelize.sync();
    console.log('Database synced');
})();

module.exports = {
    createColorLabel: (req, res) => {
        const { moodLabel, color } = req.body;
      
        ColorLabel.create({ moodLabel, color })
            .then(newColorLabel => {
                res.status(201).json({ message: 'Color label saved successfully', newColorLabel });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error saving color label' });
            });
    },
    
    getColorLabels: (req, res) => {
        ColorLabel.findAll()
            .then(colorLabels => {
                res.status(200).json(colorLabels);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error retrieving color labels' });
            });
    },

    updateColorLabel: (req, res) => {
        const { id } = req.params;
        const { newMoodLabel } = req.query;
    
        ColorLabel.findByPk(id)
            .then(colorLabel => {
                if (!colorLabel) {
                    return res.status(404).json({ error: 'Color label not found' });
                }
    
                colorLabel.moodLabel = newMoodLabel;
                return colorLabel.save();
            })
            .then(updatedColorLabel => {
                res.status(200).json({ message: 'Color label updated successfully', colorLabel: updatedColorLabel });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error updating color label' });
            });
    },

    deleteColorLabel: (req, res) => {
        const { id } = req.params;
        
        ColorLabel.findByPk(id)
            .then(colorLabel => {
                if (!colorLabel) {
                    return res.status(404).json({ error: 'Color label not found' });
                }
                
                return colorLabel.destroy();
            })
            .then(() => {
                res.status(200).json({ message: 'Color label deleted successfully' });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error deleting color label' });
            });
    },

    createDayWithColor: (req, res) => {
        const calendarData = req.body;
        const { override } = req.query;
        const promises = calendarData.map(({ day, month, year, color, colorLabelId }) => {
            return DayWithColor.findOne({ 
                where: {
                    day: day,
                    month: month,
                    year: year,
                }
            })
            .then(existingDay => {
                if (existingDay) {
                    if(override){
                        existingDay.color = color
                        return existingDay.save()
                    } else {
                        return existingDay.destroy()
                    }
                } else {
                    return DayWithColor.create({ day, month, year, color, colorLabelId });
                }
            });
        });

        Promise.all(promises)
            .then(() => {
                res.status(201).json({ message: 'Day with color saved successfully' });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error saving day with color' });
            });
    },

    getDayWithColor: (req, res) => {
        DayWithColor.findAll()
            .then(savedDaysWithColor => {
                res.status(200).json(savedDaysWithColor);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error retrieving saved days with color' });
            });
    },

    updateDayWithColor: async (req, res) => {
        const updatedData = req.body;

        try {
            // Loop through the updated data and update the records in the database
            for (const { day, month, year, color } of updatedData) {
                const existingDay = await DayWithColor.findOne({
                    where: {
                        day: day,
                        month: month,
                        year: year,
                    }
                });

                if (existingDay) {
                    existingDay.color = color;
                    await existingDay.save();
                }
            }

            res.status(200).json({ message: 'Existing calendar data updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating existing calendar data' });
        }
    },
};