-- Create Function for NOTIFY
CREATE OR REPLACE FUNCTION notify_table_changes()
RETURNS TRIGGER AS $$
DECLARE
  payload JSON;
BEGIN
  IF (TG_OP = 'DELETE') THEN
    payload := row_to_json(OLD);
  ELSE
    payload := row_to_json(NEW);
  END IF;

  PERFORM pg_notify('table_updates', json_build_object(
    'table', TG_TABLE_NAME,
    'operation', TG_OP,
    'data', payload
  )::text);

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create Trigger for Users Table
CREATE TRIGGER user_changes
AFTER INSERT OR UPDATE OR DELETE ON "Users"
FOR EACH ROW EXECUTE FUNCTION notify_table_changes();