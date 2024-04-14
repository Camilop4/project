class Earthquake < ApplicationRecord
    has_many :comments, dependent: :destroy
    validates :title, :url, :place, :mag_type, :longitude, :latitude, presence: true
    validates :magnitude, inclusion: { in: -1.0..10.0 }
    validates :latitude, inclusion: { in: -90.0..90.0 }
    validates :longitude, inclusion: { in: -180.0..180.0 }
end