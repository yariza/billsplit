import uuid

def uuid2slug(uuidstring):
    return uuid.UUID(uuidstring).bytes.encode('base64').rstrip('=\n').replace('/', '_')

def slug2uuid(slug):
    return str(uuid.UUID(bytes=(slug + '==').replace('_', '/').decode('base64')))

def random_slug():
    return uuid2slug(str(uuid.uuid4()))
