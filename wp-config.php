<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'himyname_wo4826');

/** MySQL database username */
define('DB_USER', 'himyname_wo4826');

/** MySQL database password */
define('DB_PASSWORD', 't00lb0xm3');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'EM-d`+*s6%kA5vU.031KCV1/V~{G`;Z$<#n5W}M+iUyY^V+qf3x3x(_u>%ZCR/1I');
define('SECURE_AUTH_KEY',  'RU8}KrGd80c6TkBN)2-2+4)y|SB[,?`Q7eiUH%#IK1QPB/GwE@JO1;ml;$PLDY;t');
define('LOGGED_IN_KEY',    '24DSQ|&?C|Y-.e ~Zv-|M4TDYvD+4.^U!4hQi,)Wu+1 ub/>ZkbdI3X9L+vE8nMF');
define('NONCE_KEY',        'uqz8,8H[)];&%n$ds+ea5-Hm$|y] D:Z8*{zs`19)opmWi6g#>+0X_Y;MMFBD-Db');
define('AUTH_SALT',        '[FHzbSIlMx;(NKEXYv!|rJ:]k*?1fr]vG)PuW|k|zp$mE<z-$X-;v;9@+%4~Y}Wr');
define('SECURE_AUTH_SALT', 'HP`}||uaGon5=;l-eOCz;0<<Tq<QQT{XJVyAI}$-YcGJDb.%-hG[-CsjAV1}u{-5');
define('LOGGED_IN_SALT',   'h/= I4&Or@l0&iGFLQOSrQ>Q~>LSv} ~R/n12f4T)5L$c*>VD:g ZqNmFWu<`|5|');
define('NONCE_SALT',       '?*Z2-a~jSA~IX:R1[!n+*ai*.0{zQ64C+qZ8%|?=KgnD4s19-;3opjQAGOk;q&4R');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
