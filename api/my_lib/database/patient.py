from sqlalchemy import Column, Integer, ForeignKey
from .base import Base


class Patient(Base):
    """
    Patient Model
    """

    __tablename__ = 'patients'

    Id = Column(Integer(), ForeignKey('users.Id'), primary_key=True)
    IdDoctor = Column(Integer(), ForeignKey('doctors.Id'), nullable=False)

    def serialize(self):
        """
        Serialize the Data

        Returns:
            dict: The serialized data
        """

        return {
            "Id": self.Id,
            "IdDoctor": self.IdDoctor
        }
