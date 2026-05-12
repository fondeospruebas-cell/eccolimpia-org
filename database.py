import os
import psycopg2
from psycopg2.extras import RealDictCursor
from flask import g

def get_db_connection():
    """Obtiene una conexión a la base de datos PostgreSQL."""
    db_url = os.environ.get('DATABASE_URL')
    if not db_url:
        raise RuntimeError("DATABASE_URL environment variable not set")
    conn = psycopg2.connect(db_url, sslmode='require', cursor_factory=RealDictCursor)
    return conn

def init_db():
    """Crea las tablas necesarias si no existen."""
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS trading_accounts (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            name TEXT NOT NULL,
            broker TEXT,
            active BOOLEAN DEFAULT TRUE,
            initial_balance NUMERIC DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW()
        )
    ''')
    cur.execute('''
        CREATE TABLE IF NOT EXISTS daily_pnl (
            id SERIAL PRIMARY KEY,
            user_id TEXT NOT NULL,
            account_name TEXT NOT NULL,
            date DATE NOT NULL,
            pnl NUMERIC NOT NULL,
            trades INTEGER,
            dd NUMERIC,
            profit NUMERIC,
            notes TEXT,
            timestamp TIMESTAMP DEFAULT NOW()
        )
    ''')
    conn.commit()
    cur.close()
    conn.close()