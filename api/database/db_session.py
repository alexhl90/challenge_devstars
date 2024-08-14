from boto3 import Session
from settings import AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, DYNAMODB_URL
from .Database import Database

session = Session(
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION,
)


def db_session() -> Database:
    resource = session.resource("dynamodb", endpoint_url=DYNAMODB_URL)
    return Database(resource)