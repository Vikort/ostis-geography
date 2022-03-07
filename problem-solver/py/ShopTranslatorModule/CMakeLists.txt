SET(CMAKE_BUILD_TYPE Debug)
file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (ShopTranslatorModule SHARED ${SOURCES})

target_include_directories(ShopTranslatorModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(ShopTranslatorModule sc-memory)

add_dependencies(ShopTranslatorModule sc-memory)

sc_codegen(ShopTranslatorModule ${CMAKE_CURRENT_LIST_DIR})