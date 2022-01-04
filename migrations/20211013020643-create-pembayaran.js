'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pembayaran', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_petugas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'petugas',
          key: 'id_petugas',
        },
      },
      nisn: {
        type: Sequelize.CHAR,
        allowNull: false,
        references: {
          model: 'siswa',
          key: 'nisn',
        },
      },
      tgl_bayar: {
        type: Sequelize.DATE
      },
      bulan_spp: {
        type: Sequelize.INTEGER
      },
      tahun_spp: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pembayaran');
  }
};