file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FindBySityAndOpenTimeModule SHARED ${SOURCES})

target_include_directories(FindBySityAndOpenTimeModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FindBySityAndOpenTimeModule sc-memory)

add_dependencies(FindBySityAndOpenTimeModule sc-memory)

sc_codegen(FindBySityAndOpenTimeModule ${CMAKE_CURRENT_LIST_DIR})
