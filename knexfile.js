const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
	client: 'pg',
	migrations: {
		directory: './db/migrations'
	},
	seeds: {
		directory: './db/seeds'
	}
};

const customConfig = {
	development: {
		connection: {
			database: 'nc_news',
			 user: 'liam',
			 password: 'mysecretword123',
		}
	},
	test: {
		connection: {
			database: 'nc_news_test',
			  user : 'liam',
			  password: 'mysecretword123',
		}
	}
};

module.exports = { ...customConfig[ENV], ...baseConfig };
