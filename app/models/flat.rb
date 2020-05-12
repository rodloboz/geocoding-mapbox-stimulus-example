class Flat < ApplicationRecord
  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

  # private

  # def address_changed?
  #   will_save_change_to_street? ||
  #     will_save_change_to_zip_code? ||
  #     will_save_change_to_city?
  # end
end
