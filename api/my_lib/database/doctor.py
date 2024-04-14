from sqlalchemy import Column, Integer, String, ForeignKey
from .base import Base


class Doctor(Base):
    """
    Doctor Model
    """

    __tablename__ = 'doctors'

    Id = Column(Integer(),  ForeignKey('users.Id'),
                primary_key=True, autoincrement=False)
    ContactEmail = Column(String(45), nullable=False, unique=True)
    ExperienceYears = Column(Integer(), nullable=False)

    def serialize(self):
        """
        Serialize the data

        Returns:
            dict: The serialized data
        """

        return {
            "Id": self.Id,
            "ContactEmail": self.ContactEmail,
            "ExperienceYears": self.ExperienceYears
        }
