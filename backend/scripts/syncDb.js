const { sequelize } = require("../models");


(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    
    await sequelize.sync({ alter: true });
    // await sequelize.sync({ force: true });
    console.log('✅ Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error);
  } finally {
    process.exit();
  }
})();
